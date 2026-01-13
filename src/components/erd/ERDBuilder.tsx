import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  EdgeProps,
  getBezierPath,
  BaseEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CheckCircle, XCircle, Plus, Trash2, Edit2, Link, Hash } from 'lucide-react';
import { ERDEntity, ERDRelationship, ERDSolution, ERDAttribute } from '../../types';
import { validateERD } from '../../services/erdValidator';

// --- Types ---

interface EntityNodeData {
  label: string;
  entityType?: 'strong' | 'weak' | 'associative';
  attributes?: ERDAttribute[];
  onChangeName: (id: string, newName: string) => void;
  onAddAttribute: (id: string) => void;
  onTogglePK: (nodeId: string, attrId: string) => void;
  onRenameAttribute: (nodeId: string, attrId: string, newName: string) => void;
  onDeleteAttribute: (nodeId: string, attrId: string) => void;
}

interface RelationshipEdgeData {
  cardinality: '1:1' | '1:M' | 'M:N';
  onCardinalityChange: (edgeId: string, newCard: '1:1' | '1:M' | 'M:N') => void;
  sourceParticipation?: 'mandatory' | 'optional';
  targetParticipation?: 'mandatory' | 'optional';
}

// --- Custom Components ---

const EntityNode = ({ data, id }: { data: EntityNodeData, id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data.label);

  const handleBlur = () => {
    setIsEditing(false);
    data.onChangeName(id, name);
  };

  const onAddAttr = (e: React.MouseEvent) => {
    e.stopPropagation();
    data.onAddAttribute(id);
  };

  const onTogglePK = (attrId: string) => {
    data.onTogglePK(id, attrId);
  };

  const onRenameAttr = (attrId: string, newName: string) => {
    data.onRenameAttribute(id, attrId, newName);
  };

  const onDeleteAttr = (attrId: string) => {
    data.onDeleteAttribute(id, attrId);
  };

  return (
    <div className="relative group batman-card min-w-[180px] p-4 bg-batman-dark border-2 border-batman-yellow/40 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:border-batman-yellow transition-colors">
      <Handle type="target" position={Position.Top} className="!bg-batman-yellow !w-3 !h-3" />

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-black text-batman-yellow/50 uppercase tracking-[0.2em]">Entity</div>
          <div className="flex items-center space-x-1">
            <Plus
              className="w-3.5 h-3.5 text-batman-yellow/30 hover:text-batman-yellow cursor-pointer"
              onClick={onAddAttr}
            />
            <Edit2
              className="w-3 h-3 text-batman-yellow/30 group-hover:text-batman-yellow cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </div>

        {isEditing ? (
          <input
            autoFocus
            className="w-full bg-batman-gray/50 text-batman-yellow font-black uppercase tracking-tighter border-b-2 border-batman-yellow outline-none px-1 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          />
        ) : (
          <div
            className="text-lg font-black text-batman-yellow tracking-tighter uppercase italic truncate cursor-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {data.label}
          </div>
        )}

        <div className="flex flex-col gap-1.5 pt-2 border-t border-batman-yellow/10">
          {data.attributes?.map((attr: ERDAttribute) => (
            <div key={attr.id} className="group/attr flex items-center justify-between bg-batman-yellow/5 border border-batman-yellow/10 px-2 py-1 rounded text-[10px] text-batman-yellow/80 hover:bg-batman-yellow/10 transition-colors">
              <div className="flex items-center space-x-2 flex-1">
                <button
                  onClick={() => onTogglePK(attr.id)}
                  className={`transition-colors ${attr.isKey ? 'text-batman-yellow animate-pulse' : 'text-gray-600 hover:text-batman-yellow/40'}`}
                  title={attr.isKey ? "Primary Key" : "Set as PK"}
                >
                  <Hash className="w-3 h-3" />
                </button>
                <input
                  className="bg-transparent border-none outline-none w-full font-mono focus:text-white"
                  value={attr.name}
                  onChange={(e) => onRenameAttr(attr.id, e.target.value)}
                />
              </div>
              <Trash2
                className="w-2.5 h-2.5 text-red-500/0 group-hover/attr:text-red-500/50 hover:text-red-500 cursor-pointer transition-colors"
                onClick={() => onDeleteAttr(attr.id)}
              />
            </div>
          ))}
          {(!data.attributes || data.attributes.length === 0) && (
            <div className="text-[9px] text-gray-600 italic py-1">No attributes added</div>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-batman-yellow !w-3 !h-3" />
    </div>
  );
};

const RelationshipEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  const onCardinalityChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cardinalities: ('1:1' | '1:M' | 'M:N')[] = ['1:1', '1:M', 'M:N'];
    const currentIdx = cardinalities.indexOf(data?.cardinality || '1:M');
    const nextIdx = (currentIdx + 1) % cardinalities.length;
    if (data?.onCardinalityChange) {
      data.onCardinalityChange(id, cardinalities[nextIdx]);
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: '#FFD700', strokeWidth: 3, opacity: 0.6 }} />
      <foreignObject
        width={80}
        height={40}
        x={labelX - 40}
        y={labelY - 20}
        className="overflow-visible"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="flex items-center justify-center w-full h-full">
          <button
            className={`
              flex flex-col items-center justify-center min-w-[50px] p-1.5 rounded-lg border-2 transition-all shadow-2xl active:scale-90
              ${data.cardinality === 'M:N' ? 'bg-batman-dark border-batman-yellow' : 'bg-batman-gray/90 border-batman-yellow/40'}
            `}
            onClick={onCardinalityChange}
          >
            <div className="text-[10px] font-black text-batman-yellow uppercase tracking-tighter leading-none">
              {data.cardinality || '1:M'}
            </div>
            <div className="text-[6px] text-batman-yellow/50 font-bold uppercase mt-0.5">Type</div>
          </button>
        </div>
      </foreignObject>
    </>
  );
};

interface ERDBuilderProps {
  correctSolution?: ERDSolution;
  onValidation?: (isCorrect: boolean) => void;
}

export function ERDBuilder({ correctSolution, onValidation }: ERDBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElement, setSelectedElement] = useState<{ type: 'node' | 'edge'; id: string } | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    errors: string[];
    correctSolution?: ERDSolution;
  } | null>(null);

  const nodeTypes = useMemo(() => ({ entity: EntityNode }), []);
  const edgeTypes = useMemo(() => ({ relationship: RelationshipEdge }), []);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: 'relationship',
        data: {
          cardinality: '1:M',
          onCardinalityChange: (edgeId: string, newCard: '1:1' | '1:M' | 'M:N') => {
            setEdges((eds) =>
              eds.map((e) => (e.id === edgeId ? { ...e, data: { ...e.data, cardinality: newCard } } : e))
            );
          },
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const updateNodeName = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, label: newLabel } } : n))
    );
  }, [setNodes]);

  const addAttribute = useCallback((nodeId: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          const newAttr = {
            id: `attr-${Date.now()}`,
            name: 'NEW_ATTR',
            type: 'string',
            isKey: false,
          };
          return {
            ...n,
            data: {
              ...n.data,
              attributes: [...(n.data.attributes || []), newAttr],
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const togglePK = useCallback((nodeId: string, attrId: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              attributes: (n.data.attributes || []).map((a: ERDAttribute) =>
                a.id === attrId ? { ...a, isKey: !a.isKey } : a
              ),
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const renameAttribute = useCallback((nodeId: string, attrId: string, newName: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              attributes: (n.data.attributes || []).map((a: ERDAttribute) =>
                a.id === attrId ? { ...a, name: newName } : a
              ),
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const deleteAttribute = useCallback((nodeId: string, attrId: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              attributes: (n.data.attributes || []).filter((a: ERDAttribute) => a.id !== attrId),
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const addEntity = () => {
    const newNode: Node = {
      id: `entity-${Date.now()}`,
      type: 'entity',
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: {
        label: 'NEW_ENTITY',
        entityType: 'strong',
        attributes: [],
        onChangeName: updateNodeName,
        onAddAttribute: addAttribute,
        onTogglePK: togglePK,
        onRenameAttribute: renameAttribute,
        onDeleteAttribute: deleteAttribute,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteSelected = () => {
    if (!selectedElement) return;
    if (selectedElement.type === 'node') {
      setNodes((nds) => nds.filter((n) => n.id !== selectedElement.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedElement.id && e.target !== selectedElement.id));
    } else {
      setEdges((eds) => eds.filter((e) => e.id !== selectedElement.id));
    }
    setSelectedElement(null);
  };

  const handleCheckAnswer = () => {
    if (!correctSolution) return;

    // Convert ReactFlow nodes/edges to ERD format
    const userEntities: ERDEntity[] = nodes.map((node) => ({
      id: node.id,
      name: node.data.label || 'Unnamed',
      type: node.data.entityType || 'strong',
      attributes: node.data.attributes || [],
    }));

    const userRelationships: ERDRelationship[] = edges.map((edge) => ({
      id: edge.id,
      name: typeof edge.label === 'string' ? edge.label : 'Relationship',
      type: 'binary' as const, // Default to binary, can be enhanced
      entities: [edge.source, edge.target],
      cardinality: (edge.data?.cardinality || '1:M') as '1:1' | '1:M' | 'M:N',
      participation: {
        [edge.source]: (edge.data?.sourceParticipation || 'mandatory') as 'mandatory' | 'optional',
        [edge.target]: (edge.data?.targetParticipation || 'mandatory') as 'mandatory' | 'optional',
      },
    }));

    const validation = validateERD(userEntities, userRelationships, correctSolution);
    setValidationResult(validation);

    if (onValidation) {
      onValidation(validation.isCorrect);
    }
  };

  return (
    <div className="flex flex-col h-full bg-batman-dark">
      <div className="flex items-center justify-between p-4 border-b border-batman-yellow/20 bg-batman-gray/50 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={addEntity}
            className="flex items-center space-x-2 px-6 py-2.5 bg-batman-yellow text-batman-dark rounded-xl hover:bg-batman-yellow/80 transition-all font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(255,215,0,0.3)] active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[4px]" />
            <span>New Entity</span>
          </button>

          {selectedElement && (
            <button
              onClick={deleteSelected}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(220,38,38,0.3)] active:scale-95 border border-red-400/30"
            >
              <Trash2 className="w-4 h-4" />
              <span>Destroy Selected</span>
            </button>
          )}

          {correctSolution && (
            <button
              onClick={handleCheckAnswer}
              className="flex items-center space-x-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-black uppercase tracking-tighter shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95 border border-green-400/30 ml-4"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verify Tactics</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4 text-[10px] font-black text-batman-yellow/40 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <Edit2 className="w-3 h-3" />
            <span>Double-Click Name to Edit</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link className="w-3 h-3" />
            <span>Click Badge on Line for Cardinality</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedElement({ type: 'node', id: node.id })}
          onEdgeClick={(_, edge) => setSelectedElement({ type: 'edge', id: edge.id })}
          onPaneClick={() => setSelectedElement(null)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="batman-flow"
          defaultEdgeOptions={{
            type: 'relationship',
          }}
        >
          <Background color="#FFD700" gap={20} size={1} className="opacity-10" />
          <Controls className="!bg-batman-dark !border-batman-yellow/30 !fill-batman-yellow" />
          <MiniMap
            className="!bg-batman-dark !border-batman-yellow/20"
            nodeColor="#FFD700"
            maskColor="rgba(0, 0, 0, 0.7)"
          />
        </ReactFlow>
      </div>

      {validationResult && (
        <div className={`p-4 border-t ${validationResult.isCorrect
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
          <div className={`flex items-center space-x-2 font-bold text-lg ${validationResult.isCorrect
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
            }`}>
            {validationResult.isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>CORRECT</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>FALSE</span>
              </>
            )}
          </div>
          {!validationResult.isCorrect && (
            <div className="mt-3">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-mono uppercase tracking-widest text-xs border-b border-red-500/20 pb-1">
                Correct Tactical Configuration:
              </div>
              <div className="bg-batman-dark/50 border border-batman-yellow/10 rounded-lg p-4 font-mono">
                <div className="mb-4">
                  <div className="text-[10px] font-black text-batman-yellow/50 uppercase tracking-[0.2em] mb-2">Required Entities:</div>
                  <ul className="space-y-2">
                    {validationResult.correctSolution?.entities.map((entity: ERDEntity) => (
                      <li key={entity.id} className="text-sm">
                        <span className="text-batman-yellow font-black uppercase italic tracking-tighter">{entity.name}</span>
                        <span className="text-gray-500 ml-2">[{entity.type}]</span>
                        {entity.attributes.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1 ml-4 opacity-70">
                            {entity.attributes.map((attr: ERDAttribute) => (
                              <span key={attr.id} className="text-[9px] bg-batman-yellow/5 border border-batman-yellow/10 px-1 rounded text-gray-400">
                                {attr.isKey ? 'PK:' : ''}{attr.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-black text-batman-yellow/50 uppercase tracking-[0.2em] mb-2">Mission Objectives (Relationships):</div>
                  <ul className="space-y-1">
                    {validationResult.correctSolution?.relationships.map((rel: ERDRelationship) => (
                      <li key={rel.id} className="text-xs text-gray-400 font-mono">
                        <span className="text-green-500/80 font-bold">{rel.name}</span>: {rel.cardinality}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {validationResult.errors.length > 0 && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center">
                    <XCircle className="w-3 h-3 mr-1" /> Tactical Errors Detected:
                  </div>
                  <ul className="space-y-1">
                    {validationResult.errors.map((error: string, idx: number) => (
                      <li key={idx} className="text-[11px] text-red-200/70 font-mono italic flex items-start">
                        <span className="mr-2 text-red-500">•</span> {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
